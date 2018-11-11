import { View     } from 'curvature/base/View';
import { RuleSet  } from 'curvature/base/RuleSet';
import { Persist  } from 'curvature/base/Persist';

RuleSet.add('[task]', (tag)=>{
	let r        = new View();
	r.del        = () => {
		r.parent.parent.args.list.splice(r.args.i, 1);
	};
	r.template   = `
		[[i]]
		<input cv-bind = "item.done" type = "checkbox" value = "done" />
		<input cv-bind = "item.label" />
		<button cv-on = "click:del(event)">-</button>
	`;

	return r;
});

RuleSet.add('body', (tag)=>{
	let r        = new View();
	r.args.list  = [];
	let p        = new Persist('tast-list', r.args.list);
	r.template   = `
		<button cv-on = "click:pre(event)">&lt;</button>
		<button cv-on = "click:add(event)">+</button>
		<div cv-each = "list:item:i">
			<br /><div task></div>
		</div>
	`;

	let newRecord = () => {return {label:'', done:false}};

	r.pre = (event) => r.args.list.unshift(newRecord());
	r.add = (event) => r.args.list.push(newRecord());

	return r;
});

RuleSet.wait();