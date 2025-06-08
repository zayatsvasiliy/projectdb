FROM node:18-alpine

WORKDIR /app

# Копируем зависимости
COPY package* ./


# Устанавливаем зависимости
RUN npm install
# Копируем остальной код
COPY . ./

# Запускаем приложение
CMD ["npm", "start"]
