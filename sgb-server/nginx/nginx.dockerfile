FROM nginx:latest
COPY /nginx/config/nginx.conf /etc/nginx/nginx.conf
COPY ../sgb-angular/dist/* /var/www/html/
#WORKDIR /sgb
EXPOSE 80 443
ENTRYPOINT ["nginx"]
CMD ["-g", "daemon off;"]