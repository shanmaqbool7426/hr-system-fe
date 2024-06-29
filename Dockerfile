
# Step 1: Use the official Node.js image as the base image
FROM node:20 as builder

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (or yarn.lock) to the work directory
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of your Next.js application source code
COPY . .

# Step 6: Build the Next.js application
RUN npm run build:dev

# Stage 2: Run the application using Node.js
FROM node:20

# Step 7: Set the working directory in the new stage
WORKDIR /app

# Step 8: Copy only the production dependencies and build output from the builder stage
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/*.config.js ./

# Step 9: Expose the port Next.js runs on, by default it's 3000
EXPOSE 3000

# Step 10: Define the command to run the Next.js application
CMD ["npm", "start"]