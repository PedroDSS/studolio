FROM oven/bun:latest

WORKDIR /app


COPY package*.json bun.lock ./

# Param is used to keep the same version of dependencies even if new version is available.
RUN bun install --frozen-lockfile

COPY . .

EXPOSE 3000

CMD ["bun", "start"]