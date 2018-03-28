function remove(url) {
  if (!confirm('Really to delete？')) {
    return;
  }
  $.ajax({
    url: url,
    type: 'GET',
    success: function (data) {
      {
        var jsonObj = JSON.parse(data);
        if (jsonObj.code == '1') {
          window.location.reload('/');
        } else if (jsonObj.code == '0') {
          alert('delete fail');
        }
      }
    }
  });
}