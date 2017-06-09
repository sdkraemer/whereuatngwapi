FROM nginx:1.10

MAINTAINER Scott Kraemer

VOLUME /var/cache/nginx

COPY api/docker/config/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80 443

ENTRYPOINT ["nginx"]
CMD ["-g", "daemon off;"]