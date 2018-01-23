<?php
class xManejoBD extends mysqli //extends SQLite3
{
	var $bd;
    function xManejoBD($BaseDatos)
    {
		//$this->bd = new Sqlite3($BaseDatos) or die('no se pudo conectar');
		$this->bd = new mysqli('localhost', 'wepAdmin', '159159', $BaseDatos);
		if (mysqli_connect_errno()) {
			printf("Fallo la conexión: %s\n", mysqli_connect_error());
			exit();
		}
		mysqli_set_charset($this->bd,"utf8");
		//if ($this->bd->connect_error) {die('Error de Conexión (' . $mysqli->connect_errno . ') '. $mysqli->connect_error);}
	}

	function xConsulta($Consulta){
		$error="";
		$pasa=false;
		$rows = array();
		$pos1 = strpos(strtoupper($Consulta), 'INSERT');
		$pos2 = strpos(strtoupper($Consulta), 'DELETE');
		$pos3 = strpos(strtoupper($Consulta), 'UPDATE');

		$results = $this->bd->query($Consulta);

		if ($results) {
			$this->bd->commit();
			//no insert
			if($pos1===false and $pos2===false and $pos3===false){while($row = $results->fetch_object()){$rows[]=$row;}}else{$rows[]="";}
			$pasa=true;
			}
			else {$error=$this->bd->error; $this->bd->rollBack(); $pasa=false;}

		$js = json_encode(array(
				"success" => $pasa,
				"datos" => $rows,
				"sentencia" => $Consulta,
				"error" => $error,
				"info"=> $this->bd->info
				));

		print $js;
		}

	function xConsulta_NoReturn($Consulta){
		$results = $this->bd->query($Consulta);
	}

	function xConsulta2($Consulta){
		//$error="";
		$results = $this->bd->query($Consulta);
		return $results;
		}

	function xMultiConsulta($Consulta){
		$error="";
		$UltimoId="";
		$pasa=false;
		$results = $this->bd->multi_query($Consulta);


		if ($results) {
			$UltimoId=$this->bd->insert_id;
			$this->bd->commit();
			$pasa=true;
			}
			else {$error=$this->bd->error; $this->bd->rollBack(); $pasa=false;}


		$js = json_encode(array(
				"success" => $pasa,
				"sentencia" => $Consulta,
				"error" => $error,
				"info"=> $this->bd->info,
				"UltimoId"=>$UltimoId
				));

		print $js;
		}

	function xDevolverUnDato($Consulta){
		$results = $this->bd->query($Consulta);
		while ($fila = $results->fetch_row()) {
			return $fila[0]; // la fila a devolver es d1
		  }
		}

	function xConsulta_UltimoId($Consulta){
		//$error="";
		$results = $this->bd->query($Consulta);
		//print $this->bd->insert_id;
		if ($results) {return $this->bd->insert_id;}else{$this->bd->rollBack(); return $results='error_'.$this->bd->error;}
	}
}


?>
