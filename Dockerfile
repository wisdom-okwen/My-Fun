# Frontend build
FROM node:20 as build
# Set working directory
WORKDIR /workspace/frontend/my-fun
# Copy package files
COPY ./frontend/my-fun/package.json ./
COPY ./frontend/my-fun/tsconfig.json ./
# Install dependencies
RUN npm install --force
ENV SHELL=/bin/bash
#Copy all files and directories in frontend
COPY ./frontend/my-fun ./
# Serve the app
RUN npm install --save-dev serve
# Build the application
RUN npm run build
# Start development server using serve
CMD ["serve", "-s", "frontend/my-fun/build"] 


# Backend build
FROM python:3.11
# Set environment time zone
ENV TZ="America/New_York"
# Install latest version of pip
RUN python3 -m pip install --upgrade pip
# Copy requirements and install dependencies
COPY ./backend/requirements.txt /workspace/backend/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /workspace/backend/requirements.txt
# Copy all backend resources
COPY --from=build /workspace/static /workspace/static
COPY ./backend /workspace/backend
COPY ./alembic.ini /workspace/alembic.ini
# Run backend server
WORKDIR /workspace
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8080"]

#Expose port 8080
EXPOSE 8080