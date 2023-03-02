import hljs from 'highlight.js'
import 'highlight.js/styles/xcode.css'; 
const languageSet = ['js', 'html', 'css', 'php', "ts", "C", "Rust", "Python", "bash"]
const highlightJSON = computed(()=>
    hljs.highlightAuto("const route: any = useRoute();article.value = contents.value", languageSet).value
);
// <div v-html="highlightJSON"></div>