<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
date_default_timezone_set('America/Lima');

session_start();
	include "puente.php";
	$bd=new xManejoBD("viudaneg_viuda");

	switch($_GET['op'])
	{
    // TODO: cargar items
    case 1://los 6 ultimos
			//$hasta=$_GET['h'];
			$tp=$_GET['tp'];
      $sql="SELECT p.idproductoid as idgrupo, p.idproducto as id, lower(left(p.Descripcion,instr(p.Descripcion,'(')-1)) as descripcion,
						IF(1=".$tp.",p.PrecioMayor,p.PrecioPublico) AS punitario,IF(1=".$tp.",p.PrecioMayor,p.PrecioPublico) AS precio, p.stock
						, IF(POSITION(';' IN p.img)>0,left(p.img,instr(p.img,';')-1),p.img) AS img, mg.megusta,p.idcolor,p.descuento
						FROM producto AS p
						LEFT JOIN (SELECT idproductoid,IF(sum(menc_r)=0,1,sum(menc_r)) AS megusta FROM producto GROUP BY idproductoid,idcolor) AS mg using(idproductoid)
						WHERE p.img<>'' AND p.Stock>0
						GROUP BY p.idproductoid , p.idcolor
						ORDER BY p.IdProducto DESC limit 6
            ";
      $bd->xConsulta($sql);
      break;
		case 2://mostrar item seleccionado
			$idgrupo=$_GET['id'];
			$idcolor=$_GET['idc'];
			$tp=$_GET['tp'];
			$sql="SELECT p.idproductoid as idgrupo,p.idproducto, lower(left(p.Descripcion,instr(p.Descripcion,'(')-1)) as descripcion,
						IF(1=".$tp.",p.PrecioMayor,p.PrecioPublico) AS punitario,IF(1=".$tp.",p.PrecioMayor,p.PrecioPublico) AS precio, sum(p.stock) AS stock, p.img, mg.megusta,
						GROUP_CONCAT(concat(p2.talla,'-',p2.stock,'-',p2.idproducto)) AS talla,p.composicion,p.idcolor,p.descuento
						FROM producto AS p
						LEFT JOIN (SELECT idproducto,idproductoid, talla, sum(stock) AS stock FROM producto WHERE stock>0 GROUP BY idproductoid,idcolor,talla ) AS p2 ON p2.idproducto=p.idproducto
						LEFT JOIN (SELECT idproducto,idproductoid,IF(sum(menc_r)=0,1,sum(menc_r)) AS megusta FROM producto GROUP BY idproductoid,idcolor) AS mg ON mg.idproducto=p.idproducto
						WHERE img!='' AND p.idproductoid=".$idgrupo." and p.idcolor=".$idcolor."
						GROUP BY p.idproductoid
						HAVING img!=''
						ORDER BY p.IdProducto DESC
						";
			$bd->xConsulta($sql);
			break;
		case 3://all items
				//$hasta=$_GET['h'];
				//$d=$_GET['d'];
				$tp=$_GET['tp'];
	      $sql="SELECT p.idproductoid as idgrupo, p.idproducto as id, lower(left(p.Descripcion,instr(p.Descripcion,'(')-1)) as descripcion,
							IF(1=".$tp.",p.PrecioMayor,p.PrecioPublico) AS punitario,IF(1=".$tp.",p.PrecioMayor,p.PrecioPublico) AS precio, p.stock, left(p.img,instr(p.img,';')-1) AS img, mg.megusta,p.idcolor,p.descuento
							,concat(p.descripcion,' ',p.text_buscar) as text_buscar
							FROM producto AS p
							LEFT JOIN (SELECT idproducto,idproductoid,IF(sum(menc_r)=0,1,sum(menc_r)) AS megusta FROM producto GROUP BY idproducto,idcolor) AS mg using(idproducto)
							WHERE p.Stock>0
							GROUP BY p.idproductoid , p.idcolor
							HAVING img!=''
							ORDER BY p.IdProducto DESC
	            ";
	      $bd->xConsulta($sql);
	      break;
			case 4://update me megusta
				$idgrupo=$_GET['id'];
				$idcolor=$_GET['idc'];
				$sql="UPDATE producto SET menc_r=menc_r+1 WHERE idproductoid=".$idgrupo." and idcolor=".$idcolor." AND Stock>0 limit 1";
				$bd->xConsulta($sql);
				break;
			//ubigeo
			case 5://getDepartamentos
				$sql="SELECT id_ub_departamento AS id,descripcion, costo_envio FROM ub_departamento ORDER BY descripcion";
				$bd->xConsulta($sql);
				break;
			case 501://getProvincias
				$id=$_GET['id'];
				$sql="SELECT id_ub_provincia AS id, descripcion FROM ub_provincia WHERE id_ub_departamento=".$id." ORDER BY descripcion";
				$bd->xConsulta($sql);
				break;
			case 502://getProvincias
				$id=$_GET['id'];
				$sql="SELECT id_ub_distrito AS id, descripcion FROM ub_distrito WHERE id_ub_provincia=".$id." ORDER BY descripcion";
				$bd->xConsulta($sql);
				break;
			///PUT COMPRAS
			case 6://guardar COMPRAS
				$total_compra=$_GET['dtt'];
				$data_us=base64_decode($_GET['dtu']);
				$data_us = json_decode($data_us, true);
				$data_i=base64_decode($_GET['dti']);
				$data_i = json_decode($data_i, true);

				$sql="INSERT INTO webusuario (email,nombres,dni,id_ub_departamento,id_ub_provincia,id_ub_distrito,direccion,referencia,telefono)
							SELECT '".$data_us['correo']."','".$data_us['nombres']."','".$data_us['dni']."',".$data_us['id_departamento'].",".$data_us['id_provincia'].",".$data_us['id_distrito'].",'".$data_us['direccion']."','".$data_us['referencia']."','".$data_us['telefono']."'
							FROM dual
							WHERE NOT EXISTS (SELECT * FROM webusuario WHERE email = '".$data_us['correo']."' AND dni='".$data_us['dni']."')";
				$bd->xConsulta_NoReturn($sql);

				//registrar compras
				//obtener id client
				$sql="SELECT idwebusuario as d1 FROM webusuario WHERE email = '".$data_us['correo']."' AND dni='".$data_us['dni']."'";
				$id_us=$bd->xDevolverUnDato($sql);

				$fecha=date("d/m/Y");
				$fecha1=date("dmY");
				$hora=date('H:i:s');

				$sql="INSERT INTO webpedido(idwebusuario,fecha,fecha1,hora,importe,estado) values (".$id_us.",'".$fecha."','".$fecha1."','".$hora."','".$total_compra."',1)";
				$id_pedido=$bd->xConsulta_UltimoId($sql);

				$sql_item="";
				$sql_stock="";
				foreach($data_i as $item){
					$sql_item=$sql_item."(".$id_pedido.",".$item['idproducto'].",".$item['punitario'].",".$item['cantidad'].",".$item['precio']."),";
					$sql_stock=$sql_stock."update producto set stock=stock-".$item['cantidad']." where idproducto=".$item['idproducto'].";";
				}

				//webdireccion de envio
				$sql_direccion="insert into webdireccion(idwebpedido,id_ub_departamento,id_ub_provincia,id_ub_distrito,direccion,referencia)
						value (".$id_pedido.",".$data_us['id_departamento'].",".$data_us['id_provincia'].",".$data_us['id_distrito'].",'".$data_us['direccion']."','".$data_us['referencia']."'); ";

				$sql_stock=substr($sql_stock,0,-1);
				$sql_item=substr($sql_item,0,-1);
				$sql_item=$sql_stock."; insert into webpedidodetalle (idwebpedido,idproducto,precio,cantidad,total) values ".$sql_item;

				$bd->xMultiConsulta($sql_direccion.$sql_item);
				//echo json_encode($data_i);

				break;
  }
?>
