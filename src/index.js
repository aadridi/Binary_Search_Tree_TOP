import { Tree, prettyPrint } from './bst.js';

// 1️⃣ Fonction pour générer un tableau de nombres aléatoires < 100
function generateRandomArray(size = 15, max = 100) {
	const arr = [];
	for (let i = 0; i < size; i++) {
		arr.push(Math.floor(Math.random() * max));
	}
	return arr;
}

// 2️⃣ Créer le BST
const randomArray = generateRandomArray();
console.log('Random Array:', randomArray);

const bst = new Tree();
bst.buildTree(randomArray);

// 3️⃣ Vérifier si l’arbre est équilibré
console.log('Is balanced?', bst.isBalanced());

// 4️⃣ Afficher les éléments selon différents parcours
console.log('Level Order:', bst.levelOrder());
console.log('Pre-order:', bst.preOrderForEach(null));
console.log('In-order:', bst.inOrderForEach(null));
console.log('Post-order:', bst.postOrderForEach(null));

console.log('\nPretty print of BST:');
prettyPrint(bst.root);

// 5️⃣ Déséquilibrer l’arbre en ajoutant plusieurs nombres > 100
[150, 160, 170, 180, 190].forEach((num) => bst.insert(num));
console.log('\nAfter inserting large numbers:');
prettyPrint(bst.root);

// 6️⃣ Vérifier à nouveau l’équilibre
console.log('Is balanced after insertions?', bst.isBalanced());

// 7️⃣ Rééquilibrer l’arbre
bst.rebalance();
console.log('\nAfter rebalancing:');
prettyPrint(bst.root);

// 8️⃣ Confirmer que l’arbre est équilibré
console.log('Is balanced after rebalancing?', bst.isBalanced());

// 9️⃣ Afficher à nouveau tous les parcours
console.log('Level Order after rebalance:', bst.levelOrder());
console.log('Pre-order after rebalance:', bst.preOrderForEach(null));
console.log('In-order after rebalance:', bst.inOrderForEach(null));
console.log('Post-order after rebalance:', bst.postOrderForEach(null));
