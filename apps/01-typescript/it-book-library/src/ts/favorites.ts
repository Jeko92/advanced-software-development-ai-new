import type { BookList } from './types.js';
import {
  getFavoriteIsbns,
  removeFavorite,
  updateHeaderFavoritesBadge,
  populatePublisherSelect,
  fetchAllBooks,
} from './shared.js';

const favTable = document.getElementById('favorites-list') as HTMLTableElement;
const headingCountEl = document.getElementById(
  'favorites-count',
) as HTMLHeadingElement;
const searchInput = document.getElementById('search') as HTMLInputElement;
const publisherSelect = document.getElementById(
  'by-publisher',
) as HTMLSelectElement;

let favoritedBooks: BookList = [];

async function loadFavorites(): Promise<void> {
  updateHeaderFavoritesBadge();
  const favIsbns = getFavoriteIsbns();

  if (favIsbns.length === 0) {
    favoritedBooks = [];
    renderFavorites([]);
    return;
  }

  const allBooks = await fetchAllBooks();
  favoritedBooks = allBooks.filter((book) => favIsbns.includes(book.isbn));
  populatePublisherSelect(publisherSelect, favoritedBooks);
  renderFavorites(favoritedBooks);
}

function renderFavorites(booksToRender: BookList): void {
  const tbody = favTable?.querySelector('tbody') || favTable;
  if (!tbody) return;

  tbody.innerHTML = '';

  if (headingCountEl) {
    headingCountEl.textContent = `${booksToRender.length} Favorites on your list`;
  }

  if (booksToRender.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6">No favorite books saved yet.</td></tr>`;
    return;
  }

  booksToRender.forEach((book) => {
    const row = document.createElement('tr');
    row.innerHTML = `
            <td>
                <button class="button button-clear fav-btn" title="Remove from favorites">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="fav">
                        <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clip-rule="evenodd" />
                    </svg>
                </button>
            </td>
            <td>${book.title}</td>
            <td>${book.isbn}</td>
            <td>${book.author}</td>
            <td>${book.publisher}</td>
            <td>
                <button class="button" onclick="location.href='detail.html?isbn=${book.isbn}'">Detail</button>
            </td>
        `;

    const removeBtn = row.querySelector('.fav-btn') as HTMLButtonElement;
    removeBtn.addEventListener('click', () => {
      removeFavorite(book.isbn);
      loadFavorites();
    });

    tbody.appendChild(row);
  });
}

function applyFilters(): void {
  const titleQuery = searchInput?.value.toLowerCase().trim() || '';
  const selectedPublisher = publisherSelect?.value || '';

  const filtered = favoritedBooks.filter((book) => {
    const matchesTitle = book.title.toLowerCase().includes(titleQuery);
    const matchesPublisher =
      selectedPublisher === '' ||
      selectedPublisher === '-' ||
      book.publisher === selectedPublisher;
    return matchesTitle && matchesPublisher;
  });

  renderFavorites(filtered);
}

searchInput?.addEventListener('input', applyFilters);
publisherSelect?.addEventListener('change', applyFilters);

loadFavorites();
