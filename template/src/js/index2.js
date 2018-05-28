
import '../css/base.less';
import '../css/index2.less';
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
const p = new Person(2, 2);
const pX = p.getX();
const pY = p.getY();
console.log(pX , pY);
console.log($(window).width());