export class Node {
	constructor(data) {
		this.data = data;
		this.left = null;
		this.right = null;
	}
}

export class Tree {
	constructor() {
		this.root = null;
	}

	buildTree(array) {
	// Nettoyage : suppression des doublons et tri
		const uniqueSorted = [...new Set(array)].sort((a, b) => a - b);

	// Fonction récursive interne
		const sortedArrayToBSTRecur = (arr, start, end) => {
			if (start > end) return null;

			const mid = Math.floor((start + end) / 2);
			const node = new Node(arr[mid]);

			node.left = sortedArrayToBSTRecur(arr, start, mid - 1);
			node.right = sortedArrayToBSTRecur(arr, mid + 1, end);

			return node;
		};

	// Construire l’arbre et assigner à this.root
		this.root = sortedArrayToBSTRecur(uniqueSorted, 0, uniqueSorted.length - 1);

	// Retourner la racine pour tester si nécessaire
		return this.root;
	}

	insert(root, key) {
			// If the tree is empty, return a new node
			if (root === null) return new Node(key);

			// Otherwise, recur down the tree
			if (key < root.data) root.left = insert(root.left, key);
			else root.right = insert(root.right, key);

			// Return the (unchanged) node pointer
			return root;
	}

	delete(value) {}

	find(value) {}

	levelOrder(callback) {}

	preOrder(callback) {}

	inOrder(callback) {}

	postOrder(callback) {}

	height(node) {}

	depth(node) {}

	isBalanced() {}

	rebalance() {}
}

// Fonction utilitaire pour afficher l'arbre dans la console
export function prettyPrint(node, prefix = '', isLeft = true) {
  if (node === null) return;

  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }

  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);

  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
}