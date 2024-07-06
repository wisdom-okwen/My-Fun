pushd frontend/my-fun
npm i
cd ../.. && python3 -m backend.scripts.create_db
python3 -m backend.scripts.reset_demo
honcho start