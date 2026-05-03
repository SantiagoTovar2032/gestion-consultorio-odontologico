FROM node:20-alpine

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./
COPY prisma ./prisma

# Instalar dependencias
RUN npm install

# Generar cliente Prisma
RUN npx prisma generate

# Copiar resto del código
COPY . .

# Exponer puerto
EXPOSE 3001

# Comando de inicio
CMD ["sh", "-c", "npx prisma migrate deploy && npm run start:dev"]
