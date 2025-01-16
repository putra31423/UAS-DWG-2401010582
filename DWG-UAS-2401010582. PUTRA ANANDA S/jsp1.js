var NIM = "2401010582";
var urlAPI = "https://apimhstiki.ptov.my.id/";
var urlTestiRead = urlAPI + "testi-" + NIM + "/read";
var urlTestiDel = urlAPI + "testi";

$("#infSukses").hide();
$("#infError").hide();

function hapus(id) {
  $.ajax({
    url: urlTestiDel,
    method: "POST",
    data: "ACT=destroy&NIM=" + NIM + "&IDX=" + id,
    dataType: "json",
    success: function (dt) {
      $("#infSukses").show();
      $("#infSukses").html("Penghapusan Testimoni sukses");
      setTimeout(window.location.replace("latihan71.html"), 3000);
    },
    error: function () {
      $("#infError").show();
      $("#infError").html("Pengapusan Testimoni Gagal");
      setTimeout(window.location.replace("latihan71.html"), 3000);
    },
  });
}
$(function () {
  $.ajax({
    url: urlTestiRead,
    method: "GET",
    dataType: "json",
    success: function (dta) {
      let tbl = "";
      let ipx = "";
      let cmdhapus = "";
      if (dta && (dta.error == 4 || dta.error == 0)) {
        dta.TESTI.forEach(function (isi) {
          if (dta.error == 0) {
            ipx = isi.IPX;
            cmdhapus = `<a onclick="hapus('${isi.IDX}')" class="btn btn-danger btn-sm"> Hapus </a>`;
          }
          tbl += `<tr>
                <td><img src="${isi.GRAVATAR}" width="75"> ${isi.NAMA}</td>
                <td>${isi.EMAIL}</td>
                <td>${isi.TESTI}</td>
                <td>${ipx}</td>
                <td>${cmdhapus}</td>
              </tr>`;
        });
      }
      $("tbody").html(tbl);
    },
    error: function () {
      console.log("Gagal Membaca data testimoni");
    },
  });
});
