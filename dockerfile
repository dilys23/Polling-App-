# Sử dụng image Node.js làm base image
FROM node:20.9.0

COPY package.json /
COPY package-lock.json /

WORKDIR /sgroup_be

COPY . /sgroup_be/

# Cài đặt các phụ thuộc của ứng dụng
RUN npm install

# Expose port
EXPOSE 3306

# Chạy ứng dụng khi container bắt đầu
CMD ["npm", "start"]
