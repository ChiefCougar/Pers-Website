FROM alpine:latest


LABEL org.opencontainers.image.description="Personal Website for ChiefCougar"
LABEL org.opencontainers.image.authors="ChiefCougar"
LABEL org.opencontainers.image.source = "https://github.com/ChiefCougar/Pers-Website"


RUN apk add --no-cache lighttpd
COPY ./webdata /var/www/localhost/htdocs/

COPY lighthttpd.conf /etc/lighthttpd/lighthttpd.conf

EXPOSE 80
CMD ["lighttpd", "-D", "-f", "/etc/lighthttpd/lighthttpd.conf"]
