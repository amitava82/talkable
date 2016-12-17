//Helper to create unique action names for each modules.

const app = 'talkable';

export default function (module, constants) {
       return constants.map(i => {
           return `${app}/${module}/${i}`;
       });
}