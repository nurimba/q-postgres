FROM malera/es6

### CHANGE HERE YOUR GROUP ID TO DEVELOPMENT
#ENV PERM_GROUP_ID 1000

### CHANGE HERE YOUR USER ID TO DEVELOPMENT
ENV PERM_USER_ID 1000

### CREATE GROUP FOR DEVELOPMENT
#RUN groupadd --gid ${PERM_GROUP_ID} pg

### CREATE USER FOR DEVELOPMENT
RUN echo "%sudo ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers && \
    useradd -u ${PERM_USER_ID} -G users,www-data,sudo -d /pg --shell /bin/bash -m pg && \
    echo "secret\nsecret" | passwd pg

### IMPORT FILES TO ENVIRONMENT
COPY ./.bashrc /pg/.bashrc
COPY ./entrypoint.sh /etc/entrypoint.sh
RUN chmod +x /etc/entrypoint.sh
RUN chown pg:pg /pg/.bashrc

USER pg
WORKDIR /pg

CMD ["/bin/bash"]
ENTRYPOINT ["/etc/entrypoint.sh"]
