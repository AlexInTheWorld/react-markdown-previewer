const projectName = "markdown-previewer";
localStorage.setItem('example_project', 'Markdown Previewer');

// ALLOWS LINE BREAKS WITH RETURN BUTTON
marked.setOptions({
  breaks: true });


// INSERTS target="_blank" INTO HREF TAGS (required for codepen links)
const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return `<a target="_blank" href="${href}">${text}` + '</a>';
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      markdown: placeholder,
      editorMaximized: false,
      previewMaximized: false };

    this.handleChange = this.handleChange.bind(this);
    this.handleEditorMaximize = this.handleEditorMaximize.bind(this);
    this.handlePreviewMaximize = this.handlePreviewMaximize.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
  }
  handleChange(e) {
    this.setState({
      markdown: e.target.value });

  }
  handleEditorMaximize() {
    this.setState({
      editorMaximized: !this.state.editorMaximized });

  }
  handlePreviewMaximize() {
    this.setState({
      previewMaximized: !this.state.previewMaximized });

  }
  handleKeydown(event) {
    this.setState({
      input: event.key });

  }

  render() {
    const classes = this.state.editorMaximized ?
    ['editorWrap maximized',
    'previewWrap hide',
    'fa fa-compress'] :
    this.state.previewMaximized ?
    ['editorWrap hide',
    'previewWrap maximized',
    'fa fa-compress'] :
    ['editorWrap',
    'previewWrap',
    'fas fa-window-maximize'];
    return /*#__PURE__*/(
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("div", { className: "container" }, this.state.input), /*#__PURE__*/
      React.createElement("div", { className: classes[0] }, /*#__PURE__*/
      React.createElement(Toolbar, {
        icon: classes[2],
        onClick: this.handleEditorMaximize,
        text: "Editor" }), /*#__PURE__*/
      React.createElement("textarea", { className: "editor", value: this.state.markdown,
        onChange: this.handleChange, onKeyDown: this.handleKeydown })), /*#__PURE__*/

      React.createElement("div", { className: "converter" }), /*#__PURE__*/

      React.createElement("div", { className: classes[1] }, /*#__PURE__*/
      React.createElement(Toolbar, {
        icon: classes[2],
        onClick: this.handlePreviewMaximize,
        text: "Previewer" }), /*#__PURE__*/
      React.createElement(Preview, { markdown: this.state.markdown }))));



  }}
;

const Toolbar = props => {
  return /*#__PURE__*/(
    React.createElement("div", { className: "toolbar" }, /*#__PURE__*/
    React.createElement("i", { title: "alex_here", className: "fas fa-file-code" }),
    props.text, /*#__PURE__*/
    React.createElement("i", { onClick: props.onClick, className: props.icon })));


};

const Preview = props => {
  return /*#__PURE__*/(
    React.createElement("div", { id: "preview", dangerouslySetInnerHTML: { __html: marked(props.markdown, { renderer: renderer }) } }));

};

//Now let's finally define a template literal, which is enclosed in backticks and assigned to a variable for React to use to display as initial state for --markdown-- property. As you can see it contains Markdown language to define the structure of html output in our --previewer--.

const placeholder =
`# This is a simple React Markdown Previewer! See the results of your code in the Previewer.

## You'll learn how markdown language works right away! For example, this is a sub-heading.
### And here's some other cool stuff you can do. Feel free to fiddle with it:
  
Here's some inline code, \`<div></div>\`, wrapped in 2 backticks.


// this is a multi-line code, wrapped in 3 backticks at the beginning and end:
\`\`\`
function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... voilà!
Or _italic_.
Or... you guessed it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really busy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | ------------- 
Your content can | be here, and it | can be here....
Look ma, I'm coding! | Okay. | That's enough 

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want! 
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)
`;

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById('app'));