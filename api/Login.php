<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$inData = getRequestInfo();

$id = 0;
$firstName = "";
$lastName = "";

$conn = new mysqli("localhost", "TheBeast", "kHadijah28s", "COP4331");

if( $conn->connect_error ) 
{
    returnWithError( $conn->connect_error );
} 
else 
{
    if (!isset($inData["login"]) || !isset($inData["password"])) {
        returnWithError("Missing login or password");
        exit();
    }
    
    $stmt = $conn->prepare("SELECT ID,firstName,lastName FROM Users WHERE Login=? AND Password=?");
    $stmt->bind_param("ss", $inData["login"], $inData["password"]);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if( $row = $result->fetch_assoc() ) 
    {
        returnWithInfo( $row['firstName'], $row['lastName'], $row['ID'] );
    } 
    else 
    {
        returnWithError("No Records Found");
    }
    
    $stmt->close();
    $conn->close();
}

function getRequestInfo() 
{
    $data = json_decode(file_get_contents('php://input'), true);
    if ($data === null) {
        return array();
    }
    return $data;
}

function sendResultInfoAsJson( $obj ) 
{
    header('Content-type: application/json');
    echo $obj;
}

function returnWithError( $err ) 
{
    $retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
    sendResultInfoAsJson( $retValue );
}

function returnWithInfo( $firstName, $lastName, $id ) 
{
    $retValue = '{"id":' . $id . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '","error":""}';
    sendResultInfoAsJson( $retValue );
}
?>