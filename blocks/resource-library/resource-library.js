export default async function decorate(block) {
    const suggestionPopupDiv = document.createElement('div');
    suggestionPopupDiv.id = 'suggestion-popup';
    document.body.appendChild(suggestionPopupDiv);
    block.appendChild(suggestionPopupDiv);
 }