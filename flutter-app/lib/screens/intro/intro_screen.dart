import 'package:flutter/material.dart';
import 'package:flutter_web_navigation/core.dart';
import 'package:flutter_web_navigation/services/hive_storage_service.dart';

class Intro extends StatelessWidget {
  final TextEditingController emailController = TextEditingController(text: "");
  final TextEditingController passwordController =
      TextEditingController(text: "");
  Intro({Key? key}) : super(key: key);
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey.shade100,
      body: SingleChildScrollView(
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            mainAxisAlignment: MainAxisAlignment.center,
            mainAxisSize: MainAxisSize.min,
            children: <Widget>[
              const SizedBox(
                height: 120,
                width: 350,
                child: Padding(
                    padding: EdgeInsets.symmetric(horizontal: 15),
                    child: Center(
                      child: Text('AidenKooG\'s Admin System',
                          style: TextStyle(
                            color: Colors.black87,
                            fontWeight: FontWeight.w900,
                            fontSize: 25,
                          )),
                    )),
              ),
              Padding(
                padding: const EdgeInsets.only(top: 25.0, bottom: 20),
                child: Center(
                  child: SizedBox(
                      width: 200,
                      height: 150,
                      child: Image.asset(AllImages.flutterLogo)),
                ),
              ),
              SizedBox(
                height: 80,
                width: 350,
                child: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 15),
                  child: TextFormField(
                    validator: (String? str) {
                      if (str!.isEmpty) {
                        return "Space input is not allowed for the name.";
                      }
                    },
                    controller: emailController,
                    autovalidateMode: AutovalidateMode.onUserInteraction,
                    decoration: const InputDecoration(
                        border: OutlineInputBorder(),
                        labelText: 'Username or e-mail',
                        hintText: 'Please enter your username.'),
                  ),
                ),
              ),
              SizedBox(
                  height: 80,
                  width: 350,
                  child: Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 15),
                    child: TextField(
                      controller: passwordController,
                      obscureText: true,
                      decoration: const InputDecoration(
                          border: OutlineInputBorder(),
                          labelText: 'Password',
                          hintText: 'Please enter a password.'),
                    ),
                  )),
              Container(
                height: 50,
                width: 320,
                decoration: BoxDecoration(
                    color: Colors.blue,
                    borderRadius: BorderRadius.circular(20)),
                child: TextButton(
                  onPressed: () => _logIn(),
                  child: const Text(
                    'Sign In',
                    style: TextStyle(color: Colors.white, fontSize: 18),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  _logIn() async {
    if (_formKey.currentState!.validate()) {
      await HiveDataStorageService.logUserIn();
      AppRouterDelegate().setPathName(RouteData.feature1.name);
    }
  }
}
