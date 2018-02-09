(function($) {
  "use strict"; // Start of use strict
  window.onload = function() { document.body.className = ''; }

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  var rootapi = 'http://localhost:3000/'

  $(document).ready(function() {
    function date(dateObject) {
      var d = new Date(dateObject);
      var day = d.getDate();
      var month = d.getMonth() + 1;
      var year = d.getFullYear();
      if (day < 10) {
        day = "0" + day;
      }
      if (month < 10) {
        month = "0" + month;
      }
      var date = day + " " + month + " " + year;
      return date;
    };

    function sendTokenToServer(token) {
      axios.get(rootapi + 'fb_login/', {
        headers: { access_token : token }
      })
      .then(function (response) {
          console.log('AXIOS response');
          console.log(response.data);
      })
      .catch(function (error) {
          console.error('Failed to login with Facebook');
          console.log(error);
      });
    };

    function statusChangeCallback(response) {
			if (response.status === 'connected') {
        sendTokenToServer(response.authResponse.accessToken);
			} else {
        $(window).attr('location', '/login.html')
			}
		};

    function checkLoginState() {
			FB.getLoginStatus(function(response) {
				statusChangeCallback(response);
			});
		};

    window.fbAsyncInit = function() {
      FB.init({
				appId      : '161487791158384',
				cookie     : true,
				xfbml      : true,
				version    : 'v2.11'
			});

			FB.getLoginStatus(function(response) {
				statusChangeCallback(response);
			});
		};

    $('#logout').click(function(e) {
      e.preventDefault()
      FB.logout(function(response) {
        localStorage.removeItem("accessToken")
        localStorage.removeItem("userId")
        $(window).attr('location', '/login.html')
      });
    })

    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          // console.log(target[0].id);
          $('html, body').animate({
            scrollTop: (target.offset().top)
          }, 1000, "easeInOutExpo");
          return false;
        }
      }
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $('.js-scroll-trigger').click(function() {
      $('.navbar-collapse').collapse('hide');
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $('body').scrollspy({
      target: '#sideNav'
    });

    $.ajax({
      type: 'GET',
      url: rootapi + 'news',
      success: function(resp) {
        // console.log(resp.articles.length);
        resp.articles.forEach(function(el) {
          if (el.description != null) {
            var author = (el.author) ? ' - ' + el.author : ''
            $('#content_news').append(`
              <div class="resume-item d-flex flex-column flex-md-row mb-5">
                <div class="resume-content mr-auto">
                  <h4 class="mb-0"><a href="${el.url}" target="_blank">${el.title}</a></h4>
                  <div class="subheading mb-3">${el.source.name} ${author}</div>
                  <p>${el.description}</p>
                </div>
                <div class="resume-date text-md-right">
                  <span class="text-primary">${moment(el.publishedAt).format('DD MMM YYYY')}</span>
                  <div><img src="${el.urlToImage}" alt="" height="128"></div>
                </div>
                </div>
              </div>`)
          }
        })
      },
      error: function(error) {
        console.error('Error');
      }
    });

    $.ajax({
      type: 'GET',
      url: rootapi + 'music/search?artistName=Jackson',
      success: function(resp) {
        // console.log(resp.results);
        resp.results.forEach(function(el) {
          var embeded = `<audio controls preload="none">
                          <source src="${el.previewUrl}" type="audio/m4a"/>
                          <source src="${el.previewUrl}" type="audio/ogg" />
                        </audio>`
          if (el.previewUrl.split('.').pop() == 'm4v') {
            embeded = `<video width="400" height="200" src="${el.previewUrl}" type="video/mp4" controls></video>`
          }
          $('#content_music').append(`
            <div class="resume-item d-flex flex-column flex-md-row mb-5">
              <div class="resume-content mr-auto">
                <h4 class="mb-0">${el.artistName} - ${el.trackName}</h4>
                <div class="subheading mb-3">${el.collectionCensoredName} (${el.primaryGenreName})</div>
                ${embeded}
              </div>
              <div class="resume-date text-md-right">
                <span class="text-primary">${moment(el.releaseDate).format('DD MMM YYYY')}</span>
                <div>
                  <div><img src="${el.artworkUrl100}" alt="" height="100"></div>
                </div>
              </div>
            </div>`)
        })
      },
      error: function(error) {
        console.error('Error');
      }
    })

  })
})(jQuery); // End of use strict
