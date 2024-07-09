async function insert() {
    await User.create({
        name: "Ryan",
        email: "ryandcunha2812@gmail.com",
    })
}

insert()