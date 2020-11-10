/** @format */

const { execSync } = require('child_process');

let previousTag;
try {
  const currentTag = getCurrentTag();
  const currentTagHash = getHashOfTag(currentTag);
  const previousTagHash = getPreviousHashOfTag(currentTagHash);

  previousTag = getTagOfHash(previousTagHash);
} catch (error) {
  previousTag = 'origin/master';
}

execSync(`echo ${previousTag} > dist/.previous-tag`);

console.log('Saved previous tag to dist/.previous-tag', previousTag);

function getCurrentTag() {
  return execSync('git describe --tags --abbrev=0')
    .toString()
    .trim();
}

function getHashOfTag(tag) {
  return execSync(`git rev-parse ${tag}`)
    .toString()
    .trim();
}

function getPreviousHashOfTag(currentTagHash) {
  const allTagsHashesArray = execSync('git rev-list --tags')
    .toString()
    .split('\n');

  const previousHashOfTagIndex = allTagsHashesArray.indexOf(currentTagHash) + 1;
  return allTagsHashesArray[previousHashOfTagIndex];
}

function getTagOfHash(hash) {
  return execSync(`git describe --abbrev=0 --tags ${hash}`).toString();
}
