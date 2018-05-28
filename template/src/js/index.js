
import '../css/base.less';
import '../css/index.less';
import $ from 'jquery';
class Person {
	constructor (x = 1, y = 2) {
		this.x = x;
		this.y = x;
	}
	getY() {
		return this.y;
	}
	getX() {
		return this.x;
	}
}
const p = new Person();
const pX = p.getX();
const pY = p.getY();
console.log($);