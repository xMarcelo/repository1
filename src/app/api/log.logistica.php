<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
date_default_timezone_set('America/Lima');

session_start();
	include "puente.php";
	$bd=new xManejoBD("webmipe");

	$_SESSION['idorg']=1;
	$_SESSION['idsede']=1;
	switch($_GET['op'])
	{
    case 1://data categorias
      	$sql="select descripcion as name,idcategoria as id from categoria where idorg=".$_SESSION['idorg']." and estado=0";
      	$bd->xConsulta($sql);
      break;
		case 2://TALLA
	    	$sql="select descripcion as name,idtalla as id from talla where estado=0";
	    	$bd->xConsulta($sql);
	    break;
		case 3://marcas
				$sql="select descripcion as name,idmarca as id from marca where idorg=".$_SESSION['idorg']." and estado=0";
				$bd->xConsulta($sql);
			break;
		case 4://COLOR
				$sql="select descripcion as name,idcolor as id from color where idorg=".$_SESSION['idorg']." and estado=0";
				$bd->xConsulta($sql);
			break;
		case 5://guardar Producto
				$dtProducto=base64_decode($_GET['dtP']);
				$dtProducto = json_decode($dtProducto, true);
				$dtItem=base64_decode($_GET['dtI']);
				$dtItem = json_decode($dtItem, true);

				//cocinamos data
				$idcategoria=$dtProducto['idcategoria'];
				$idmarca=$dtProducto['idmarca'];
				// $idcolor=$dtItem['idcolor'];

				 if($idcategoria===0){
				 	$sql_categoria="insert into categoria (idorg,descripcion) values (".$_SESSION['idorg'].",'".$dtProducto['des_categoria']."')";
				 	$idcategoria=$bd->xConsulta_UltimoId($sql_categoria);
				}
				$idmarca=$idmarca?$idmarca:0;
				if($dtProducto['des_marca']!="" && $idmarca===0){
					$sql_marca="insert into marca (idorg,descripcion) values (".$_SESSION['idorg'].",'".$dtProducto['des_marca']."')";
					$idmarca=$bd->xConsulta_UltimoId($sql_marca);
				}

				//obtenemos el idproducto
				$sql_producto="insert into producto (idorg,idcategoria,idmarca,descripcion,composicion,caracteristicas,especificaciones) values (".$_SESSION['idorg'].",".$idcategoria.",".$idmarca.",'".$dtProducto['descripcion']."','".$dtProducto['composicion']."','".$dtProducto['caracteristicas']."','".$dtProducto['especificaciones']."')";
				$idproducto=$bd->xConsulta_UltimoId($sql_producto);

        		//detalle del producto
				$sql_producto_detalle="";
				$sql_prodcuto_stock="";
				$cadena_color="";
				foreach($dtItem as $item){
					//cocinando idcolor
					$des_color=$item['des_color'];
					$idcolor_dt=$item['idcolor'];
					if($idcolor_dt===0){//si todvia no hay registro en bd
						if(strpos($cadena_color,$des_color)<=0){
							$sql_color="insert into color (idorg,descripcion) values (".$_SESSION['idorg'].",'".$item['des_color']."')";
							$idcolor=$bd->xConsulta_UltimoId($sql_color);
						}
					}else{
						$idcolor=$idcolor_dt;
					}
					$cadena_color=$cadena_color.','.$item['des_color'];

					//producto_detalle
					$sql_producto_detalle=$sql_producto_detalle."(".$idproducto.",".$_SESSION['idorg'].",".$_SESSION['idsede'].",".$idcolor.",".$item['idtalla'].",'".$item['codigobarras']."','".$dtProducto['precio1']."','".$dtProducto['precio2']."',".$item['cantidad']."),";

					//producto_stock
					// $sql_prodcuto_stock=$sql_prodcuto_stock."(".$idproducto.",".$_SESSION['idorg'].",".$_SESSION['idsede'].",".$item['cantidad'].",".$idproducto.$idcolor.$item['idtalla']."),";
				}
				$sql_producto_detalle=substr($sql_producto_detalle,0,-1);
				$sql_producto_detalle="insert into producto_detalle (idproducto, idorg, idsede,idcolor,idtalla,codigobarras,precio1,precio2,stock_ini) values ".$sql_producto_detalle;				
				// $sql_prodcuto_stock=substr($sql_prodcuto_stock,0,-1);
				// $sql_prodcuto_stock="insert into producto_stock (idproducto,idorg,idsede,stock,idcodboutique) values ".$sql_prodcuto_stock;

				// $bd->xMultiConsulta($sql_producto_detalle."; ".$sql_prodcuto_stock);
				//echo $sql_producto_detalle;
				$bd->xMultiConsulta($sql_producto_detalle."; ");
				break;

		case 6://listado de producto
			$sql="
			SELECT p.idproducto,pd.idproducto_detalle,pds.idproducto_stock,pds.idcodboutique,pds.idsede,upper(concat(p.descripcion,' | ',co.descripcion,' | ',ta.descripcion,' | ',m.descripcion)) AS descripcion,s.descripcion AS sede,format(pd.precio1,2) AS precio1,format(pd.precio2,2) AS precio2,pds.stock,pd.img,upper(concat(p.descripcion,' | ',co.descripcion,' | ',ta.descripcion,' | ',m.descripcion,' | ',s.descripcion)) AS txt_buscar,
					pd.codigobarras
					FROM producto AS p
					INNER JOIN producto_detalle AS pd ON pd.idproducto=p.idproducto
					INNER JOIN producto_stock AS pds ON pds.idproducto_detalle=pd.idproducto_detalle
					INNER JOIN sede AS s ON s.idsede=pds.idsede
					INNER JOIN marca AS m ON m.idmarca=p.idmarca
					INNER JOIN categoria AS cat ON cat.idcategoria=p.idcategoria
					INNER JOIN color AS co ON co.idcolor=pd.idcolor
					INNER JOIN talla AS ta ON ta.idtalla=pd.idtalla
				WHERE p.idorg=".$_SESSION['idorg']." AND p.estado=0
				ORDER BY p.idproducto DESC limit 80
			";
			$bd->xConsulta($sql);
			break;

		case 7://guardar cambios lista producto
			$dtProducto=base64_decode($_GET['dtP']);
			$dtProducto = json_decode($dtProducto, true);

			$sql_precio="";
			$sql_stock="";
			foreach($dtProducto as $item){
				$sql_precio=$sql_precio."(".$item['idproducto_detalle'].",'".$item['precio1']."','".$item['precio2']."'),";
				$sql_stock=$sql_stock."(".$item['idproducto_stock'].",".$item['stock']."),";
			}
			$sql_precio=substr($sql_precio,0,-1);
			$sql_stock=substr($sql_stock,0,-1);
			$sql_precio="insert into producto_detalle (idproducto_detalle,precio1,precio2) value ".$sql_precio." ON DUPLICATE KEY UPDATE precio1=values(precio1),precio2=values(precio2)";
			$sql_stock="insert into producto_stock (idproducto_stock,stock) value ".$sql_stock." ON DUPLICATE KEY UPDATE stock=values(stock);";

			$bd->xMultiConsulta($sql_precio."; ".$sql_stock);
			break;
  }
?>
