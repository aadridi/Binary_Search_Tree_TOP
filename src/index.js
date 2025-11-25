import { Tree, prettyPrint } from './bst.js';

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const tree = new Tree();

// Construction du BST
tree.buildTree(arr);

// Affichage console
console.log('Arbre initial :');
prettyPrint(tree.root);
