#!/bin/bash

rm -rf /var/www/uxadmin
mkdir -p /var/www/uxadmin
cp public/* /var/www/uxadmin -R
service nginx start

