// prefix text
$("input #prefix").on("input", function () {
  if ($(this)[0].checkValidity()) {
    $(this).removeClass("is-invalid");
    $(this).addClass("is-valid");
  } else {
    $(this).removeClass("is-valid");
    $(this).addClass("is-invalid");
  }

  // check if submit button should be clickable
  $("button.submitButton").attr("disabled", !$("form")[0].checkValidity());
});

$("#welcomeMessageCheckbox").change(function () {
  if ($(this).prop("checked")) {
    // checked
    $("#welcomeMessage").prop("required", true);
    $("#welcomeMessage").prop("disabled", false);
    $("#welcomeMessageChannel").prop("required", true);
    $("#welcomeMessageChannel").prop("disabled", false);

    // check if submit button should be clickable
    $("button.submitButton").attr("disabled", !$("form")[0].checkValidity());
  } else {
    // unchecked
    $("#welcomeMessage").prop("required", false);
    $("#welcomeMessage").prop("disabled", true);
    $("#welcomeMessage").removeClass("is-valid");
    $("#welcomeMessage").removeClass("is-invalid");
    $("#welcomeMessageChannel").prop("required", false);
    $("#welcomeMessageChannel").prop("disabled", true);
    $("#welcomeMessageChannel").removeClass("is-valid");
    $("#welcomeMessageChannel").removeClass("is-invalid");

    // check if submit button should be clickable
    $("button.submitButton").attr("disabled");
  }
});

$("#leaveMessageCheckbox").change(function () {
  if ($(this).prop("checked")) {
    // checked
    $("#leaveMessage").prop("required", true);
    $("#leaveMessage").prop("disabled", false);
    $("#leaveMessageChannel").prop("required", true);
    $("#leaveMessageChannel").prop("disabled", false);

    // check if submit button should be clickable
    $("button.submitButton").attr("disabled", !$("form")[0].checkValidity());
  } else {
    // unchecked
    $("#leaveMessage").prop("required", false);
    $("#leaveMessage").prop("disabled", true);
    $("#leaveMessage").removeClass("is-valid");
    $("#leaveMessage").removeClass("is-invalid");
    $("#leaveMessageChannel").prop("required", false);
    $("#leaveMessageChannel").prop("disabled", true);
    $("#leaveMessageChannel").removeClass("is-valid");
    $("#leaveMessageChannel").removeClass("is-invalid");

    // check if submit button should be clickable
    $("button.submitButton").attr("disabled", !$("form")[0].checkValidity());
  }
});

$(document).ready(function () {
  // check if submit button should be clickable
  $("button.submitButton").attr("disabled", !$("form")[0].checkValidity());
});
