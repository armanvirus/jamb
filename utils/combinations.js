const courses = {
    engineering:["english","mathmatics","physics","chemistry"],
    science:["english","biology","chemistry","physics"],
    arts:["english",],
    social_science:["english"]

}
module.exports = [
    {
        course:'engineering',
        combination:courses.engineering
    },
    {   course:'science',
        combination:courses.science
    },
    {
        course:"arts",
        combination:courses.science
    },
    {
        course:""
    }
]