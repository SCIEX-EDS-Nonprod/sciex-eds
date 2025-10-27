export default function decorate(block) {
    const iconCardContainer = document.createElement('div');
    iconCardContainer.className = 'icon-card-container';
    iconCardContainer.append(block);
}