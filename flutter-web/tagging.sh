echo '################################'
echo 'tagging start'

git tag -a $1 -m $2
git tag -l
git push origin $1

echo '################################'
echo 'tagging finished'
