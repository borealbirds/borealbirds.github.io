cd ..
mkdir _tmp
cd _tmp
git clone -b dev https://github.com/borealbirds/borealbirds.github.io.git dev
cd dev
npm install
gridsome build
cd ..
git clone -b master https://github.com/borealbirds/borealbirds.github.io.git master
cd master
git rm -r *
cp -r ../dev/dist/* ./
git add --all *
git commit -m "Update website"
git push -q origin master
cd ..
rm -rf _tmp
cd borealbirds.github.io
