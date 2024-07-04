# Frontend build
FROM node:18 as build
# Copy package files
COPY ./fronend/my-fun/package.json /workspace/fronend/my-fun/package.json
COPY ./fronend/my-fun/tsconfig.json /workspace/fronend/my-fun/tsconfig.json
WORKDIR /workspace/frontend/my-fun
# Install dependencies
RUN npm install
ENV SHELL=/bin/bash
#Copy all files and directories in frontend
COPY ./frontend/my-fun /workspace/frontend/my-fun
# Build the application
RUN npm run build
# Serve the app
RUN npm install -g serve


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