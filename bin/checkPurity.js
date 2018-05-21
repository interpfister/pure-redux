#! /usr/bin/env node
const findInFiles = require('find-in-files');
const sloc = require('node-sloc');
 
const options = {
  path: '.',
  ignorePaths: ['node_modules'],
}

findInFiles.find('setState', '.', '.(js|ts|jsx|tsx)$')
    .then((results) => {
		const setStateMentionCount = Object.keys(results).reduce((accumulator, currentResult) => {
			console.log(`Found setState in ${currentResult}`);
			return accumulator + results[currentResult].count;
		}, 0);
		
		sloc(options).then((res) => {
		  const totalLines = res.sloc.sloc;
		  console.log(`Total Lines: ${totalLines}`);
		  console.log(`Total setState mentions: ${setStateMentionCount}`);
		  const pureReduxRatio = 1 - (setStateMentionCount / totalLines);
		  const pureReduxPercentage = (pureReduxRatio * 100);
		  console.log(`Redux Purity Percentage: ${pureReduxPercentage}%`);
		  if (pureReduxPercentage === 100) {
			  console.log('PURE REDUX ACHIEVED');
		  }
		});
	});
	
