<?php
    $url = "http://www.baidu.com";
    $f = fopen($url,"r");
    $html = "";
    if($f){
    while (!feof($f)) {
        $html .= fgets($f);
     }
    }
    echo $html;
    ?>