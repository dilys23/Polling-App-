# Sử dụng image Node.js làm base image
FROM node:20.9.0


WORKDIR /usr/src/app

COPY . .

# Cài đặt các phụ thuộc của ứng dụng
RUN npm install

# Sao chép toàn bộ mã nguồn vào thư mục làm việc

# Expose port
EXPOSE 3306

# Chạy ứng dụng khi container bắt đầu
CMD ["npm", "start"]
