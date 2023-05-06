echo '######################################'
echo 'commit start'

git status
git stash
git pull --prune
git stash pop
git add .
git commit -m $1
git push
git checkout master
git merge dev
git push
git checkout dev

echo '######################################'
echo 'commit finished'