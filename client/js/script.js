$(document).ready(function () {
  let c = document.getElementById("canvas");
  let ctx = c.getContext("2d");
  let json;
  let name;
  let x;
  let y;
  let ClipX;
  let ClipY;
  let ClipW;
  let ClipH;
  let Color;
  let sensor_image;

  //getting the data from the server
  $.ajax({
    url: "http://localhost/TSG/server/server.php",
    success: function (data) {
      json = JSON.parse(data);
      if (json) {
        //data is ready
        //display settings
        ctx.fillStyle = "#64b5f6";
        ctx.fillRect(0, 0, 500, 500);

        //change the background color
        $("input[type=radio]").click(function () {
          if (this.checked) {
            color = $(this).attr('id');
            ctx.fillStyle = color;
            ctx.fillRect(0, 0, 500, 500);
          }
        });

        //add event only after fetching is done
        $("input[type=checkbox]").click(function () {
          ctx.fillStyle = 'blue';
          ctx.fillRect(0, 0, 500, 500);

          if (this.checked) {
            //checking wich sensor was checked:
            var sensor = $(this).attr("class");

            //NONE was selected
            if (sensor == 'NONE') {
              ctx.fillStyle = 'blue';
              ctx.fillRect(0, 0, 500, 500);
              $(".IKONOS").prop('checked', false);
              $(".GEOEYE").prop('checked', false);
              $(".OFEK").prop('checked', false);
              $(".ALL").prop('checked', false);
            }
            //case of ALL selected
            if (sensor == 'ALL') {
              $(".IKONOS").prop('checked', true);
              $(".GEOEYE").prop('checked', true);
              $(".OFEK").prop('checked', true);
              $(".NONE").prop('checked', false);

              for (let i in json) {
                const {
                  Name,
                  X,
                  Y,
                  ClipX,
                  ClipY,
                  ClipW,
                  ClipH
                } = json[i];
                /************* DRAWING the image ********************** */
                sensor_image = document.getElementById(Name);
                console.log(sensor_image);
                ctx.drawImage(sensor_image, X, Y, ClipX, ClipY, X, Y, ClipH, ClipW);
              }
            }

            for (let i in json) {
              //checkboxs of:IKONOS,GEOEYE,OFEK
              if (json[i].Sensor == sensor) {
                const {
                  Name,
                  X,
                  Y,
                  ClipX,
                  ClipY,
                  ClipW,
                  ClipH
                } = json[i];
                //drawing the image
                sensor_image = document.getElementById(Name);
                console.log(sensor_image);
                ctx.drawImage(sensor_image, X, Y, ClipX, ClipY, X, Y, ClipH, ClipW);
              }
            }
          }
        });
      }
    },
    error: function (e) {
      console.log(e);
    }
  });



});