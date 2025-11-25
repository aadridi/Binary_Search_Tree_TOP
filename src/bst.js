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

	// -------------------------
	// BUILD TREE
	// -------------------------
	buildTree(array) {
		const uniqueSorted = [...new Set(array)].sort((a, b) => a - b);

		const build = (arr, start, end) => {
			if (start > end) return null;

			const mid = Math.floor((start + end) / 2);
			const node = new Node(arr[mid]);

			node.left = build(arr, start, mid - 1);
			node.right = build(arr, mid + 1, end);

			return node;
		};

		this.root = build(uniqueSorted, 0, uniqueSorted.length - 1);
		return this.root;
	}

	// -------------------------
	// INSERT
	// -------------------------
	insert(value) {
		this.root = this._insertRec(this.root, value);
	}

	_insertRec(root, key) {
		if (root === null) return new Node(key);

		if (key < root.data) {
			root.left = this._insertRec(root.left, key);
		} else if (key > root.data) {
			root.right = this._insertRec(root.right, key);
		}

		return root;
	}

	// -------------------------
	// DELETE
	// -------------------------
	delete(value) {
		this.root = this.deleteItem(this.root, value);
	}

	getSuccessor(node) {
		let curr = node.right;
		while (curr !== null && curr.left !== null) {
			curr = curr.left;
		}
		return curr;
	}

	deleteItem(root, x) {
		if (root === null) return root;

		if (x < root.data) {
			root.left = this.deleteItem(root.left, x);
		} else if (x > root.data) {
			root.right = this.deleteItem(root.right, x);
		} else {
			// 0 or 1 child
			if (root.left === null) return root.right;
			if (root.right === null) return root.left;

			// 2 children
			const succ = this.getSuccessor(root);
			root.data = succ.data;

			root.right = this.deleteItem(root.right, succ.data);
		}

		return root;
	}

	// -------------------------
	// REMAINING METHODS (empty)
	// -------------------------
	find(value, node = this.root) {
		if (node === null) return null;

		if (value === node.data) return node;

		if (value < node.data) {
			return this.find(value, node.left);
		} else {
			return this.find(value, node.right);
		}
	}

	levelOrder(callback) {}
	preOrder(callback) {}
	inOrder(callback) {}
	postOrder(callback) {}
	height(node) {}
	depth(node) {}
	isBalanced() {}
	rebalance() {}
}

// -------------------------
// PRETTY PRINT
// -------------------------
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
