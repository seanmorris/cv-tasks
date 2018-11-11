import { Bindable } from 'curvature/base/Bindable';
import { View     } from 'curvature/base/View';
import { RuleSet  } from 'curvature/base/RuleSet';
import { Persist  } from 'curvature/base/Persist';

RuleSet.add('[task]', (tag)=>{
	console.log(tag);
	let r      = new View();
	r.del      = (id) => tag.parent.del(id);
	r.template = `
		[[i]]
		<input  cv-bind = "item.done" type = "checkbox" />
		<input  cv-bind = "item.label" />
		<button cv-on   = "click:del(i)">-</button>
	`;

	return r;
});

RuleSet.add('body', (tag)=>{
	let r       = new View();
	r.args.list = [];
	let p       = new Persist('task-list', r.args.list);
	r.template  = `
		<button cv-on = "click:pre(event)">&lt;</button>
		<button cv-on = "click:add(event)">+</button>
		<div cv-each = "list:item:i">
			<br /><div task></div>
		</div>
	`;

	r.pre = (event) => r.args.list.unshift({label:'', done: 0});
	r.add = (event) => r.args.list.push({label:'', done: 0});
	r.del = (id)    => r.args.list.splice(id, 1);

	return r;
});

RuleSet.wait();
