/**
 * Main decorate function
 */
export default function decorate(block) { 
    const switchTabContainer = document.createElement('div');
    switchTabContainer.className = 'switch-tabs-container';
    block.append(switchTabContainer);
}