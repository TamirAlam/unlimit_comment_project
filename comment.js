const images = [
  'https://plus.unsplash.com/premium_photo-1729581092024-e61ccc9dccfb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8',
  'https://images.unsplash.com/photo-1727775447812-117baa795bcf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5fHx8ZW58MHx8fHx8',
  'https://images.unsplash.com/photo-1731433485144-c196fe4c9648?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxM3x8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1730642215052-71d2185fc0c6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxN3x8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1719937206589-d13b6b008196?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMXx8fGVufDB8fHx8fA%3D%3D'
];

document.addEventListener('click', function (event) {
  if (event.target.classList.contains('reply-btn')) {
    showReplyForm(event.target);
  } else if (event.target.classList.contains('edit-btn')) {
    editComment(event.target);
  } else if (event.target.classList.contains('delete-btn')) {
    deleteComment(event.target);
  } else if (event.target.classList.contains('post-btn')) {
    postComment(event.target);
  } else if (event.target.classList.contains('cancel-btn')) {
    cancelReplyForm(event.target);
  } else if (event.target.classList.contains('refresh-btn')) {
    resetComments();
  }
});

function showReplyForm(button) {
  const replyFormTemplate = document.getElementById('reply-form-template');
  const newReplyForm = replyFormTemplate.cloneNode(true);
  newReplyForm.style.display = 'flex';
  newReplyForm.id = '';
  button.closest('.comment').after(newReplyForm); 
}

function editComment(button) {
  const commentContent = button.closest('.comment-content');
  const commentText = commentContent.querySelector('.comment-text');
  const replyFormTemplate = document.getElementById('reply-form-template');
  const editForm = replyFormTemplate.cloneNode(true);

  editForm.style.display = 'flex';
  editForm.id = '';
  editForm.querySelector('.user-name').value = commentContent.querySelector('h3').innerText;
  editForm.querySelector('.comment-textarea').value = commentText.innerText;
  button.closest('.comment').after(editForm); // Insert edit form below the current comment

  commentText.style.display = 'none';
  button.style.display = 'none';
}

function deleteComment(button) {
  const comment = button.closest('.comment');
  comment.remove();
}

function postComment(button) {
  const replyForm = button.closest('.reply-form');
  const userName = replyForm.querySelector('.user-name').value;
  const commentText = replyForm.querySelector('.comment-textarea').value;

  // Randomly select a user image
  const randomImage = images[Math.floor(Math.random() * images.length)];

  const newComment = document.createElement('div');
  newComment.classList.add('comment');
  newComment.style.marginLeft = '30px';
  newComment.innerHTML = `
    <img src="${randomImage}" alt="User Image">
    <div class="comment-content">
        <h3>${userName}</h3>
        <p class="comment-text">${commentText}</p>
        <div class="comment-actions">
            <button class="reply-btn">Reply</button>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </div>
    </div>
  `;

  replyForm.after(newComment); // Insert the new comment below the reply form
  replyForm.remove(); // Remove the reply form after posting
}

function cancelReplyForm(button) {
  button.closest('.reply-form').remove();
}

function resetComments() {
  const container = document.querySelector('.container');
  container.innerHTML = `
    <div class="header">
      <button class="refresh-btn">Reset</button>
    </div>
    <div class="comment">
      <img src="office.png" alt="User Image">
      <div class="comment-content">
        <h3>John Doe</h3>
        <p>Welcome! You can reply to the comments. But you can't delete the initial comment.</p>
        <div class="comment-actions">
          <button class="reply-btn">Reply</button>
        </div>
      </div>
    </div>
    <div class="comment" style="margin-left: 30px;">
      <img src="resturant.jpg" alt="User Image">
      <div class="comment-content">
        <h3>User 1</h3>
        <p class="comment-text">You can reply nested or delete any comment. You can edit the existing comments.</p>
        <div class="comment-actions">
          <button class="reply-btn">Reply</button>
          <button class="edit-btn">Edit</button>
          <button class="delete-btn">Delete</button>
        </div>
      </div>
    </div>
    <div id="reply-form-template" class="reply-form" style="display: none;">
      <div style="flex: 1;">
        <input type="text" placeholder="User name" class="user-name">
        <textarea placeholder="Write a reply..." class="comment-textarea"></textarea>
        <div class="form-actions">
          <button class="cancel-btn">Cancel</button>
          <button class="post-btn">Post</button>
        </div>
      </div>
    </div>
  `;
}
