
  /* eslint-disable react/prop-types */
  import { useState } from "react";
  import { useNavigate } from "react-router-dom";
  import LoggedInSideBar from "./LoggedInSideBar";
  
  const Search = () => {
    const [search, setSearch] = useState("");
    const [activeFilter, setActiveFilter] = useState("all");
    const navigate = useNavigate();
  
  
  const data = {
    devotionals: [
      {
        id: 1,
        title: "Daily Devotional",
        description: "Start your day with God's word.",
        image: "https://tse1.mm.bing.net/th?id=OIP.SG9k3SykipyTNSfTtsTsWwHaEo&rs=1&pid=ImgDetMain",
        content: `
          **Scripture:** Psalm 118:24 - "This is the day that the Lord has made; let us rejoice and be glad in it."
          
          **Reflection:** Each morning brings a fresh opportunity to experience God's love and mercy. As you begin your day, take a moment to reflect on the gift of life and the promise of God's presence. No matter what challenges lie ahead, His strength is available to you.
          
          **Application:** Spend 5 minutes in silence, thanking God for three specific blessings in your life. Let this gratitude shape your attitude throughout the day.
        `
      },
      {
        id: 2,
        title: "Faith Boost",
        description: "Strengthen your faith with this devotional.",
        image: "https://th.bing.com/th/id/R.8bf9be9cc1e02eba2e28c312cbd49cd9?rik=BQ1ppizGHdW0Zw&pid=ImgRaw&r=0",
        content: `
          **Scripture:** Hebrews 11:1 - "Now faith is the assurance of things hoped for, the conviction of things not seen."
          
          **Reflection:** Faith isn't about seeing the entire path ahead but trusting the One who guides your steps. When doubts creep in, remember the countless times God has been faithful in your life and in the lives of those before you.
          
          **Application:** Write down one area where you need to trust God more. Pray over it daily for a week, asking for increased faith.
        `
      },
      {
        id: 3,
        title: "Hope for Today",
        description: "Find hope in every situation.",
        image: "https://th.bing.com/th/id/OIP.3-k1vKGZxlECdykRjMkZKQHaJ4?w=750&h=1000&rs=1&pid=ImgDetMain",
        content: `
          **Scripture:** Romans 15:13 - "May the God of hope fill you with all joy and peace in believing."
          
          **Reflection:** Hope is not wishful thinking; it's a confident expectation rooted in God's character. Even in dark times, His light shines through, promising a future worth anticipating.
          
          **Application:** Share a word of encouragement with someone struggling today, reflecting the hope you have in Christ.
        `
      },
      {
        id: 4,
        title: "Grace Abounds",
        description: "Experience God's grace daily.",
        image: "https://th.bing.com/th/id/R.3d9586ddd1174922ffec93fbd45cd53b?rik=sBMXYI0WKwjFkA&pid=ImgRaw&r=0",
        content: `
          **Scripture:** 2 Corinthians 12:9 - "My grace is sufficient for you, for my power is made perfect in weakness."
          
          **Reflection:** God's grace meets us in our imperfections, offering forgiveness and strength. It's not earned but freely given, a daily reminder of His unconditional love.
          
          **Application:** Reflect on a recent mistake. Thank God for His grace and ask Him to help you grow from it.
        `
      },
      {
        id: 5,
        title: "Peace in Chaos",
        description: "Find peace amidst chaos.",
        image: "https://www.lca.org.au/wp-content/uploads/2020/07/daily-devotions.jpg",
        content: `
          **Scripture:** John 16:33 - "In me you may have peace. In the world you will have tribulation."
          
          **Reflection:** Life's storms can't shake the peace Christ offers. It's an anchor for your soul, steadying you when everything else feels uncertain.
          
          **Application:** When stress rises today, pause and breathe deeply while repeating this verse silently.
        `
      },
    ],
    prayers: [
      {
        id: 1,
        title: "Morning Prayer",
        description: "A prayer to start your day.",
        image: "https://th.bing.com/th/id/R.eff3ef49cead49e956966e10d6b28261?rik=uMPnwoMof4gC%2fQ&riu=http%3a%2f%2fjeanwilund.com%2fwp-content%2fuploads%2f2015%2f05%2fDoes-Prayer-Change-Gods-Mind-Isaiah-37-21-1024x1024.jpg&ehk=39xblHCnuX%2f3nLqEEmwXZnxwus9LUT14kaLeB9sJW8w%3d&risl=&pid=ImgRaw&r=0",
        content: `
          Heavenly Father,
          
          As I rise this morning, I come before You with a grateful heart. Thank You for the gift of a new day, for the breath in my lungs, and for Your unfailing love that greets me each dawn. I surrender this day to You—my plans, my worries, my hopes, and my fears.
          
          Lord, guide my steps today. Let Your wisdom direct my decisions, Your strength uphold me in challenges, and Your peace fill my spirit. May my words reflect Your grace, and my actions honor Your name. Protect me and my loved ones from harm, and open my eyes to see opportunities to serve others.
          
          I pray for those who are hurting this morning—bring them comfort. For those who are lost—show them Your light. And for me, Lord, keep me close to You, that I may walk in Your will.
          
          In Jesus’ name, Amen.
        `
      },
      {
        id: 2,
        title: "Healing Prayer",
        description: "Prayer for physical and emotional healing.",
        image: "https://th.bing.com/th/id/OIP.nN6dYNt5gH168oHW2Q3b_gHaFj?w=243&h=182&c=7&r=0&o=5&dpr=1.5&pid=1.7",
        content: `
          Merciful God,
          
          You are the Great Physician, the One who heals both body and soul. I come to You today seeking Your touch of restoration. For every ache in my body, every wound in my heart, and every burden on my mind, I ask for Your healing power to flow.
          
          Lord, You know my struggles—seen and unseen. Where there is pain, bring relief. Where there is brokenness, bring wholeness. Where there is despair, bring hope. Surround me with Your presence, and let Your peace wash over me like a soothing balm.
          
          I lift up others in need of healing too—friends, family, and those I don’t even know. May Your love reach them, lifting their spirits and renewing their strength. Help me to trust Your timing and Your ways, even when healing looks different than I expect.
          
          In the precious name of Jesus, Amen.
        `
      },
      {
        id: 3,
        title: "Prayer for Peace",
        description: "Prayer for inner peace.",
        image: "https://th.bing.com/th/id/OIP.T99eYvB01jnaTzvd2j5qPAHaEK?w=1200&h=675&rs=1&pid=ImgDetMain",
        content: `
          Prince of Peace,
          
          My heart is restless, and my mind is troubled. The world around me swirls with noise and chaos, and I long for the calm that only You can give. I lay my anxieties at Your feet, asking You to replace them with Your perfect peace.
          
          Quiet my thoughts, Lord. Help me to release what I cannot control and to trust in Your sovereign care. Let Your presence be my refuge, a safe haven where fear cannot dwell. Teach me to rest in You, moment by moment.
          
          Extend this peace to others as well—those facing storms greater than mine. May we all find solace in Your unchanging love. Thank You for being my peace, now and always.
          
          In Jesus’ name, Amen.
        `
      },
      {
        id: 4,
        title: "Prayer for Strength",
        description: "Prayer for strength in tough times.",
        image: "https://th.bing.com/th/id/OIP.dcf3Wm_gy_Wf6fiGFqpC1QHaHa?rs=1&pid=ImgDetMain",
        content: `
          Almighty God,
          
          I feel weak today, overwhelmed by the weight of my circumstances. But You are my rock, my fortress, and my deliverer. I need Your strength to carry on, to face what lies ahead with courage and faith.
          
          Fill me with Your power, Lord. When my energy fails, be my sustenance. When my resolve wavers, be my anchor. Help me to stand firm, not in my own might, but in Yours. Let me see Your hand at work even in the hardest moments.
          
          I pray for others who are weary too—lift them up, renew their spirits, and remind them they’re not alone. Thank You for Your promise to never leave us, and for the strength that comes from Your presence.
          
          In the name of Jesus, Amen.
        `
      },
      {
        id: 5,
        title: "Prayer for Guidance",
        description: "Prayer for divine guidance.",
   
  
  image: "https://th.bing.com/th/id/OIP.VdOeXkhEBt1m9EdVIVDfhgHaEK?rs=1&pid=ImgDetMain",
        content: `
          Loving Father,
          
          I stand at a crossroads, uncertain of which way to go. My own understanding feels limited, and I need Your light to show me the path. You promise to guide those who seek You, so I come humbly asking for Your direction.
          
          Speak to my heart, Lord. Make Your will clear through Your Word, through wise counsel, and through the quiet whispers of Your Spirit. Give me discernment to recognize Your voice above the noise, and courage to follow where You lead.
          
          For every decision I face—big or small—be my compass. I pray for others seeking guidance too, that we may all align our steps with Your perfect plan. Thank You for being a God who leads us with love.
          
          In Jesus’ name, Amen.
        `
      },
    ],
    sermons: [
      {
        id: 1,
        title: "The Power of Faith",
        description: "A sermon on living by faith.",
        image: "https://th.bing.com/th/id/OIP.lZV6NbCee_YdgXPgN1DPNQAAAA?rs=1&pid=ImgDetMain",
        content: `
          **Scripture:** Hebrews 11:6 - "And without faith it is impossible to please him, for whoever would draw near to God must believe that he exists and that he rewards those who seek him."
          
          **Introduction:**
          Good morning, church! Today we’re diving into a topic that’s at the heart of our Christian walk: faith. Not just a casual belief, but a living, active faith that transforms how we live, how we face trials, and how we trust God. Hebrews 11 is often called the "Hall of Faith," showcasing men and women who lived boldly because they believed God’s promises. What can we learn from them today?
          
          **Point 1: Faith Trusts God’s Character**
          Think about Abraham. God called him to leave everything familiar and go to a land he’d never seen. Why did he go? Because he trusted who God is—a faithful, promise-keeping God. Faith isn’t blind; it’s rooted in knowing God’s character. When we face uncertainty—job loss, illness, broken relationships—faith says, “I don’t see the end, but I trust the One who does.”
          
          **Point 2: Faith Acts in Obedience**
          Noah built an ark when there wasn’t a cloud in the sky. People mocked him, yet he obeyed because he believed God’s warning. Faith isn’t passive; it moves us to action. Maybe God’s calling you to forgive someone, to step out in ministry, or to give generously even when it’s tight. Faith obeys even when it doesn’t make sense to the world.
          
          **Point 3: Faith Endures Through Trials**
          Consider Job. He lost everything—wealth, health, family—yet he said, “Though He slay me, I will hope in Him” (Job 13:15). Faith doesn’t crumble under pressure; it clings to God’s goodness. In your darkest moments, faith whispers, “God is still here, and He’s still enough.”
          
          **Conclusion:**
          Church, the power of faith isn’t in us—it’s in the God we trust. It’s not about having all the answers but knowing the One who does. Today, where is God asking you to exercise faith? Step out, trust Him, and watch Him move. Let’s pray for that courage now.
          
          **Prayer:**
          Lord, grow our faith. Help us trust You, obey You, and endure through You. Amen.
        `
      },
      {
        id: 2,
        title: "Love Your Neighbor",
        description: "A sermon on the importance of love.",
        image: "https://th.bing.com/th/id/OIP.p8Y1GjJ5fShOQTXq8XT_kgHaFj?rs=1&pid=ImgDetMain",
        content: `
          **Scripture:** Mark 12:31 - "You shall love your neighbor as yourself."
          
          **Introduction:**
          Friends, Jesus gave us two great commandments: love God and love your neighbor. Simple, right? Yet so hard to live out. Today, let’s unpack what it means to truly love those around us—not just the easy ones, but the difficult ones too.
          
          **Point 1: Love is a Choice**
          Love isn’t just a warm feeling; it’s a decision. The Good Samaritan didn’t feel like helping—he chose to. That annoying coworker, that rude driver, that estranged family member—loving them starts with choosing to see them as God does: valuable, broken, and in need of grace.
          
          **Point 2: Love is Practical**
          Jesus didn’t just talk about love; He showed it—feeding the hungry, healing the sick, washing feet. Love gets its hands dirty. It’s bringing a meal to a grieving friend, listening to someone’s pain, or helping a stranger with a flat tire. How can you make love tangible this week?
          
          **Point 3: Love Reflects Christ**
          When we love others, we mirror Jesus to the world. 1 John 4:12 says, “If we love one another, God abides in us.” Our love isn’t perfect, but it points to the One who is. In a divided world, our love can be a beacon of hope.
          
          **Conclusion:**
          Who’s your neighbor today? Not just the person next door, but anyone God puts in your path. Let’s commit to loving them—not because they deserve it, but because Christ first loved us. Let’s pray for His love to flow through us.
          
          **Prayer:**
          God, teach us to love like You do—selflessly, practically, boldly. Amen.
        `
      },
      {
        id: 3,
        title: "Forgiveness",
        description: "A sermon on the power of forgiveness.",
        image: "https://th.bing.com/th/id/OIP.T0cQnZbwz-RVbiIdbPYkpwHaFL?rs=1&pid=ImgDetMain",
        content: `
          **Scripture:** Colossians 3:13 - "Bearing with one another and, if one has a complaint against another, forgiving each other; as the Lord has forgiven you, so you also must forgive."
          
          **Introduction:**
          Forgiveness. It’s one of the hardest things Jesus calls us to do, yet one of the most freeing. Today, we’ll explore why forgiveness matters, what it costs, and how it heals—both for us and others.
          
          **Point 1: Forgiveness Reflects God’s Heart**
          God didn’t wait for us to deserve forgiveness—He gave it freely on the cross. When we forgive, we’re not excusing the wrong; we’re reflecting His mercy. That person who hurt you? God loves them too, and He’s working in their story.
          
          **Point 2: Forgiveness Frees Us**
          Holding a grudge is like drinking poison and expecting the other person to suffer. Unforgiveness chains us to the past, but forgiveness breaks those chains. It’s not easy—it might take time—but it’s worth it for your own peace.
          
          **Point 3: Forgiveness Builds Bridges**
          Think of Joseph forgiving his brothers who sold him into slavery. That act didn’t just heal him; it restored a family. Your forgiveness could be the start of reconciliation, a testimony of God’s grace in action.
          
          **Conclusion:**
          Who do you need to forgive today? It’s not weakness—it’s strength from God. Let’s release the hurt to Him and trust Him to heal. Join me in prayer for that grace.
          
          **Prayer:**
          Father, help us forgive as You’ve forgiven us. Heal our wounds and use us to heal others. Amen.
        `
      },
      {
        id: 4,
        title: "Hope in Christ",
        description: "A sermon on finding hope in Christ.",
        image: "https://th.bing.com/th/id/OIP.oETUakBWOz9tsULsaulqwwHaE8?w=274&h=183&c=7&r=0&o=5&dpr=1.5&pid=1.7",
        content: `
          **Scripture:** 1 Peter 1:3 - "Blessed be the God and Father of our Lord Jesus Christ! According to his great mercy, he has caused us to be born again to a living hope."
          
          **Introduction:**
          In a world of bad news, where do we find hope? Not in circumstances, but in Christ. Today, let’s discover the living hope He offers—a hope that doesn’t fade, no matter what we face.
          
          **Point 1: Hope is Alive**
          Peter calls it a “living hope” because Jesus rose from the dead. Our hope isn’t wishful thinking—it’s grounded in a Savior who conquered death. That means no situation is hopeless when we have Him.
          
          **Point 2: Hope Sustains Us**
          The early Christians faced persecution, yet they had joy. Why? Their hope was in eternity, not just the here and now. When life crumbles, Christ holds us steady with the promise of His return.
          
          **Point 3: Hope Compels Us**
          This hope isn’t meant to be hoarded—it’s to be shared. People around us are desperate for something real. Our hope in Christ can light their darkness, pointing them to the source of all hope.
          
          **Conclusion:**
          Where’s your hope today? Fix it on Jesus, the unshakable foundation. Let’s pray for that hope to overflow in us and through us.
          
          **Prayer:**
          Lord, be our living hope. Lift our eyes to You and use us to share Your hope with others. Amen.
        `
      },
      {
        id: 5,
        title: "Living with Purpose",
        description: "A sermon on living a purposeful life.",
        image: "https://th.bing.com/th/id/R.2e04da349671687590697522553013d4?rik=qCHTfqnkuNnr2g&pid=ImgRaw&r=0",
        content: `
          **Scripture:** Ephesians 2:10 - "For we are his workmanship, created in Christ Jesus for good works, which God prepared beforehand, that we should walk in them."
          
          **Introduction:**
          Do you ever wonder why you’re here? God doesn’t create anything without purpose, and that includes you. Today, let’s explore how to live intentionally for Him, fulfilling the calling He’s placed on your life.
          
          **Point 1: You Are God’s Masterpiece**
          “Workmanship” means you’re handcrafted by God. You’re not an accident—every talent, every experience, every moment has purpose in His hands. Embrace who He made you to be.
          
          **Point 2: Purpose is Found in Christ**
          The world says purpose comes from success or stuff. God says it’s in Jesus—knowing Him and making Him known. When we align with Him, our daily tasks become holy assignments.
          
          **Point 3: Purpose Unfolds in Action**
          God prepared good works for you—not to earn His love, but to express it. It might be raising kids with faith, serving your community, or sharing the gospel at work. Step into what He’s calling you to do today.
          
          **Conclusion:**
          Your life has purpose because God says so. Let’s stop drifting and start living for Him. What’s one step you can take this week? Let’s pray for clarity and courage.
          
          **Prayer:**
          God, show us our purpose in You. Guide us to the good works You’ve prepared, and give us boldness to walk in them. Amen.
        `
      },
    ],
  };


  const getFilteredItems = () => {
    if (activeFilter === "all" && !search) {
      return {
        devotionals: data.devotionals,
        prayers: data.prayers,
        sermons: data.sermons
      };
    }

    let allItems = [];
    if (activeFilter === "all") {
      allItems = [
        ...data.devotionals.map(item => ({ ...item, category: "devotionals" })),
        ...data.prayers.map(item => ({ ...item, category: "prayers" })),
        ...data.sermons.map(item => ({ ...item, category: "sermons" }))
      ];
    } else {
      allItems = data[activeFilter].map(item => ({ ...item, category: activeFilter }));
    }

    if (search) {
      allItems = allItems.filter(
        (item) =>
          item.title.toLowerCase().includes(search.toLowerCase()) ||
          item.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    return { filtered: allItems };
  };

  const handleItemClick = (item) => {
    navigate(`/content/${item.category}/${item.id}`, { state: { item } });
  };

  const handleSeeAll = (category) => {
    // Add category to each item before passing
    const itemsWithCategory = data[category].map(item => ({ ...item, category }));
    navigate(`/category/${category}`, { state: { items: itemsWithCategory } });
  };

  const filteredItems = getFilteredItems();

  return (
    <div className="flex min-h-screen gap-6 max-md:flex-col-reverse">
      <div className="w-[130px] max-md:w-full mt-3 max-md:mt-0">
        <LoggedInSideBar />
      </div>
      <div className="flex-1 p-4">
        <form className="mt-4">
          <div className="flex items-center gap-3">
            <input
              type="text"
              className="w-full max-w-[680px] h-[50px] md:h-[74px] rounded-[30px] border border-[#edebeb] bg-[#ededeb] px-4 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ff6132]"
              value={search}
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setSearch("")}
              className="text-[#ff6132] hover:text-[#ff4122]"
            >
              Cancel
            </button>
          </div>
        </form>

        <div className="flex items-center gap-2 overflow-x-auto mt-6 whitespace-nowrap py-2">
          <FilterComponent
            text="#all"
            isActive={activeFilter === "all"}
            onClick={() => setActiveFilter("all")}
          />
          {["devotionals", "prayers", "sermons"].map((filter) => (
            <FilterComponent
              key={filter}
              text={`#${filter}`}
              isActive={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
            />
          ))}
        </div>

        {activeFilter === "all" && !search ? (
          <>
            <Section
              title="Top Devotionals"
              items={filteredItems.devotionals}
              onItemClick={handleItemClick}
              onSeeAll={() => handleSeeAll("devotionals")}
            />
            <Section
              title="Top Prayers"
              items={filteredItems.prayers}
              onItemClick={handleItemClick}
              onSeeAll={() => handleSeeAll("prayers")}
            />
            <Section
              title="Top Sermons"
              items={filteredItems.sermons}
              onItemClick={handleItemClick}
              onSeeAll={() => handleSeeAll("sermons")}
            />
          </>
        ) : (
          <Section
            title={search ? "Search Results" : `${activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)}`}
            items={filteredItems.filtered}
            onItemClick={handleItemClick}
            onSeeAll={activeFilter !== "all" ? () => handleSeeAll(activeFilter) : null}
          />
        )}
      </div>
    </div>
  );
};

// Section and FilterComponent remain unchanged
function Section({ title, items, onItemClick, onSeeAll }) {
  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl md:text-2xl font-bold">{title}</h2>
        {onSeeAll && (
          <button 
            onClick={onSeeAll}
            className="text-[#ff6132] font-semibold hover:text-[#ff4122]"
          >
            See All
          </button>
        )}
      </div>
      {items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="cursor-pointer hover:shadow-md transition-shadow rounded-lg overflow-hidden"
              onClick={() => onItemClick(item)}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-32 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold truncate">{item.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-8">No results found</p>
      )}
    </div>
  );
}

function FilterComponent({ text, isActive, onClick }) {
  return (
    <button
      className={`border rounded-[20px] px-4 py-2 cursor-pointer transition-all text-sm md:text-base
        ${isActive ? "bg-[#ff6132] text-white" : "border-[#ff6132] hover:bg-[#ff6132] hover:text-white"}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Search;