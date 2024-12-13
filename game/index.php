<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
    <style>
        *{
            margin: auto;
        }
        body {
            background: #1a1a2e;
            /* Dark background */
            color: #fff;
            font-family: 'Arial', sans-serif;
            margin: auto;
        }

        .form-container {
            background: #0f3460;
            border-radius: 15px;
            padding: 30px;
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.2), 0 0 50px rgba(0, 255, 255, 0.3);
        }

        .form-container h2 {
            color: #00d9ff;
            text-align: center;
            text-shadow: 0 0 10px #00d9ff, 0 0 20px #00d9ff;
        }

        .form-group label {
            color: #fff;
            font-size: 1.2rem;
        }

        .form-control {
            background: transparent;
            border: 1px solid #00d9ff;
            border-radius: 10px;
            color: #fff;
            box-shadow: 0 0 5px rgba(255, 255, 255, 0.1), 0 0 15px rgba(0, 255, 255, 0.4);
        }

        .form-control:focus {
            background: transparent;
            border-color: #ff00ff;
            box-shadow: 0 0 10px #ff00ff;
        }

        .btn-primary {
            background: #00d9ff;
            border: none;
            border-radius: 20px;
            color: #000;
            font-size: 1.2rem;
            text-shadow: 0 0 10px #fff;
            box-shadow: 0 0 10px #00d9ff, 0 0 20px #00d9ff;
            transition: all 0.3s ease-in-out;
        }

        .btn-primary:hover {
            background: #ff00ff;
            box-shadow: 0 0 20px #ff00ff, 0 0 40px #ff00ff;
            transform: scale(1.1);
        }

        .form-check-label {
            color: #fff;
        }

        .form-check-input:checked {
            background-color: #00d9ff;
            border-color: #00d9ff;
            box-shadow: 0 0 10px #00d9ff;
        }

        .text-danger {
            color: #ff4d4d;
        }
    </style>
    <title>Neon Registration Form</title>
</head>

<?php
$nameErr = $emailErr = $mobileErr = $genderErr = $agreeErr = '';
$name = $mobile = $email = $gender = $agree = '';
$successMessage = '';

function input_data($data)
{
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (empty($_POST['name'])) {
        $nameErr = 'Name is required!';
    } else {
        $name = input_data($_POST['name']);
        if (!preg_match("/^[a-zA-Z\s]*$/", $name)) {
            $nameErr = 'Only alphabets and whitespaces are allowed!';
        }
    }

    if (empty($_POST['email'])) {
        $emailErr = 'Email is required!';
    } else {
        $email = input_data($_POST['email']);
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $emailErr = 'Invalid email format!';
        }
    }

    if (empty($_POST['mobile'])) {
        $mobileErr = 'Mobile number is required!';
    } else {
        $mobile = input_data($_POST['mobile']);
        if (!preg_match("/^[0-9]{10}$/", $mobile)) {
            $mobileErr = 'Invalid mobile number! Must be 10 digits.';
        }
    }

    if (empty($_POST['gender'])) {
        $genderErr = 'Gender is required!';
    } else {
        $gender = input_data($_POST['gender']);
    }

    if (empty($_POST['agree'])) {
        $agreeErr = 'You must agree to the terms!';
    } else {
        $agree = input_data($_POST['agree']);
    }

    if (empty($nameErr) && empty($emailErr) && empty($mobileErr) && empty($genderErr) && empty($agreeErr)) {
        $successMessage = "Form submitted successfully!";
    }
}
?>

<body>
    <div class="container d-flex justify-content-center align-items-center" style="min-height: 100vh;">
        <div class="col-md-6 form-container">
            <h2>Neon Registration Form</h2>

            <?php if ($successMessage): ?>
                <div class="alert alert-success text-center">
                    <?= $successMessage ?>
                </div>
            <?php endif; ?>

            <form action="index.php" method="post">
                <div class="form-group">
                    <label for="name">Name:</label>
                    <input type="text" name="name" id="name" class="form-control" value="<?= htmlspecialchars($name) ?>" placeholder="Enter your name">
                    <small class="text-danger"><?= $nameErr ?></small>
                </div>

                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" name="email" id="email" class="form-control" value="<?= htmlspecialchars($email) ?>" placeholder="Enter your email">
                    <small class="text-danger"><?= $emailErr ?></small>
                </div>

                <div class="form-group">
                    <label for="mobile">Mobile:</label>
                    <input type="text" name="mobile" id="mobile" class="form-control" value="<?= htmlspecialchars($mobile) ?>" placeholder="Enter your mobile number">
                    <small class="text-danger"><?= $mobileErr ?></small>
                </div>

                <div class="form-group">
                    <label>Gender:</label><br>
                    <div class="form-check form-check-inline">
                        <input type="radio" name="gender" value="Male" class="form-check-input" id="genderMale" <?= $gender == 'Male' ? 'checked' : '' ?>>
                        <label class="form-check-label" for="genderMale">Male</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input type="radio" name="gender" value="Female" class="form-check-input" id="genderFemale" <?= $gender == 'Female' ? 'checked' : '' ?>>
                        <label class="form-check-label" for="genderFemale">Female</label>
                    </div>
                    <small class="text-danger"><?= $genderErr ?></small>
                </div>

                <div class="form-group form-check">
                    <input type="checkbox" name="agree" class="form-check-input" id="agree" value="yes" <?= $agree == 'yes' ? 'checked' : '' ?>>
                    <label class="form-check-label" for="agree">Agree to terms of service</label>
                    <small class="text-danger"><?= $agreeErr ?></small>
                </div>

                <button type="submit" class="btn btn-primary btn-block">Submit</button>
            </form>
        </div>
    </div>
</body>

</html>