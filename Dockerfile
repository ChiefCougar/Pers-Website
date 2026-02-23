FROM alpine:latest

RUN apk add --no-cache lighttpd
COPY ./webdata /var/www/localhost/htdocs/

COPY lighthttpd.conf /etc/lighthttpd/lighthttpd.conf

EXPOSE 80
CMD ["lighttpd", "-D", "-f", "/etc/lighthttpd/lighthttpd.conf"]
