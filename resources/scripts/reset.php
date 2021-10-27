<?php
/*-------------------------------------------------
Script Name: est-query.php
Description: Queries Meditech (SSRS) and grabs a value representing the number of minutes to be seen by a doctor in ER. 4 hour average.
Created by: Andrew Campeau
Last modified: 2020-12-10
-------------------------------------------------*/

$myfile = fopen("time.log", "w") or die("Unable to open file!");
fwrite($myfile, time());
fclose($myfile);
