import '../../index.scss';
import './search-room.scss';
import '../website-pages/website-pages.scss';
import '../../components/date-filter';
import '../../components/count-picker';
import '../../components/dropdown-block';
import '../../components/range-slider';
import '../../components/expandable-checkbox-list';
import RoomCard from '../../components/room-card/RoomCard';

const roomCardsDoms = document.querySelectorAll('.js-room-card');
const roomCards = [];
roomCardsDoms.forEach((roomCardDom) => roomCards.push(new RoomCard(roomCardDom)));
const handleWindowResize = () => roomCards.forEach((roomCard) => roomCard.updateCarouselHeight());
window.addEventListener('resize', handleWindowResize);
