.PHONY: install start dot-env api-shell mongo-shell


install:
	@-${MAKE} dot-env
	@docker compose up --remove-orphans


start:
	@docker compose up


dot-env:
	@printf "MONGO_HOST=localhost\n \
             MONGO_PORT=27017\n \
             MONGO_ROOT_USERNAME=admin\n \
             MONGO_ROOT_PASSWORD=local_insecure_pass\n \
             MONGO_DATABASE=spotify\n \
             MONGODB_DATA_DIR=/data/db\n \
             MONGO_AUTH_SOURCE=admin\n \
             SPOTIFY_CLIENT_SECRET=f6971745c6984002ac71e886a56d5fd9\n \
             SPOTIFY_CLIENT_ID=fa97525d779649ddb81e0b512b821848" \
    | tr -d "[:blank:]" \
    > .env


api-shell:
	@docker exec -it spotify.api bash


mongo-shell:
	@docker exec -it spotify.mongo_db mongo admin -u admin -p 'local_insecure_pass'
