export default function decorate(block) { 
    const resourceDiv = document.createElement('div');
    resourceDiv.className = 'sciex-related-resource';

    const heading = block.children[1]?.textContent?.trim() || 'Related Resources';
    const headingDiv = document.createElement('div');
    headingDiv.className = 'resource-heading';
    headingDiv.append(heading);

    resourceDiv.append(headingDiv);
    block.append(resourceDiv);
}